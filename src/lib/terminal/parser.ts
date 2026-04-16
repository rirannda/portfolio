import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { terminal } from "$lib/state/terminalState.svelte";
import { os } from "$lib/state/osState.svelte";

export async function parseCommand(input: string, Path: string) {
    // 空白で分割（連続する空白にも対応させるなら正規表現 /\s+/ が便利です）
    const args = input.trim().split(/\s+/);
    if (args.length === 1) { args.push(''); } // コマンドのみの場合、args[1]がundefinedになるのを防ぐため空文字を追加
    const command = args[0];
    switch (command) {
        case 'help':
            return { response: 'Available commands: help, clear, echo, cd, pwd, whoami, date, ls, uname, reboot, fakefetch, welcome' };
        case 'echo':
            return { response: args.slice(1).join(' ') };
        case 'cd':
            {
                let target = (args[1] == '') ? '/' : args[1];
                if (target.startsWith('/home/visitor/portfolio') || target.startsWith('/home/visitor/portfolio/')) {
                    target = target.replace('/home/visitor/portfolio', '/'); // カレントディレクトリを表す部分を削除
                }
                if ((target.endsWith('/')) && (target !== '/')) {
                    target = target.replace(/\/+$/, ''); // パスの末尾のスラッシュを削除
                }
                if (!target || target === '~' || target === '/') {
                    await goto(resolve('/'));
                    return { response: '' };
                }
                if (target == 'about' || target == '/about') {
                    await goto(resolve('/about'));
                    return { response: '' };
                }
                if (target == 'projects' || target == '/projects') {
                    await goto(resolve('/projects'));
                    return { response: '' };
                }
                if (target == 'skills' || target == '/skills') {
                    await goto(resolve('/skills'));
                    return { response: '' };
                }
                if (target == 'root' || target == 'etc' || target == 'var' || target == 'usr' || target == '/root' || target == '/etc' || target == '/var' || target == '/usr') {
                    return { response: `cd: permission denied: ${target}`, isError: true };
                }
                return { response: `cd: no such file or directory: ${target}`, isError: true };
            }
        case 'ls':
            {
                let target = (args[1] == '') ? '.' : args[1];
                if (target.startsWith('/home/visitor/portfolio') || target.startsWith('/home/visitor/portfolio/')) {
                    target = target.replace('/home/visitor/portfolio', '/'); // カレントディレクトリを表す部分を削除
                }
                if ((target.endsWith('/')) && (target !== '/')) {
                    target = target.replace(/\/+$/, ''); // パスの末尾のスラッシュを削除
                }

                if ((Path == '' && target == '.') || target == '/') {
                    return { response: ['about projects skills'] };
                }
                if ((Path == '/about' && target == '.') || target == '/about' || Path == '' && target == 'about') {
                    return { response: ['+page.svelte'] };
                }
                if ((Path == '/projects' && target == '.') || target == '/projects' || Path == '' && target == 'projects') {
                    return { response: ['+page.svelte'] };
                }
                if ((Path == '/skills' && target == '.') || target == '/skills' || Path == '' && target == 'skills') {
                    return { response: ['+page.svelte'] };
                }
                return { response: `ls: cannot access '${target}': No such file or directory`, isError: true };
            }
        case 'pwd':
            return { response: 'home/visitor/portfolio' + Path };
        case 'clear':
            terminal.clearOutput();
            return { response: '' };
        case 'whoami':
            return { response: 'visitor' };
        case 'date':
            return { response: new Date().toString() };
        case 'uname':
            return { response: 'Folix' };
        case 'reboot':
            os.setRebooting(true);
            return { response: 'Broadcast message from system: System is going down for reboot NOW!' };
        case 'sudo':
            return { response: 'sudo: visitor is not in the sudoers file. This incident will not be reported.' };
        case 'su':
            return { response: 'su: permission denied' };
        case 'fakefetch':
            return {
                response: [
                    " ********   *******   **       ** **     **   visitor@Folix",
                    '/**/////   **/////** /**      /**//**   **    -------------',
                    '/**       **     //**/**      /** //** **     OS: PortfoliOS Folix web edition',
                    '/******* /**      /**/**      /**  //***      Host: Web Browser',
                    '/**////  /**      /**/**      /**   **/**     Kernel: Folix 0.0.1',
                    '/**      //**     ** /**      /**  ** //**    Theme: ' + os.theme,
                    '/**       //*******  /********/** **   //**   Developer: gorirari',
                    '//         ///////   //////// // //     //    ',
                ]
            };
        case 'welcome':
            return {
                response: [
                    "Welcome to the portfolio of gorirari!",
                    "Type 'help' to see the list of available commands.",
                    "Feel free to explore and have fun!"
                ]
            };
        default:
            return { response: `Command not found: ${command}`, isError: true };
    }
}