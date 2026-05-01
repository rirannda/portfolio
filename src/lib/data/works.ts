export type Work = {
    id: string;
    name: string;
    images: string[];     // スクリーンショットのパス
    description: string;
    tech: { bg: string, textColor: string, label: string }[]
    repoUrl: string;
    isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
    {
        id: 'portfolio-os',
        name: 'PortfoliOS',
        images: ['/images/portfolio.png'],
        description: '本ポートフォリオサイト。Svelte5で実装。コマンドラインから実際にサイト内を操作できるギミックを搭載しました。',
        tech: [
            { bg: 'svelte', textColor: 'lighttext', label: ' Svelte' },
            { bg: 'tailwind', textColor: 'lighttext', label: '󱏿 Tailwind CSS' },
            { bg: 'typescript', textColor: 'lighttext', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/portfolio',
        isFeatured: true
    },
    {
        id: 'app-a',
        name: 'Awesome App A',
        images: ['/images/app-a.png'],
        description: 'Reactで作ったすごいアプリ。',
        tech: [
            { bg: 'react', textColor: 'lighttext', label: ' React' },
            { bg: 'typescript', textColor: 'lighttext', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/app-a',
        isFeatured: true
    },
    {
        id: 'tool-b',
        name: 'Convenient Tool B',
        images: ['/images/tool-b.png'],
        description: 'Pythonで作った便利なスクリプト。',
        tech: [
            { bg: 'python', textColor: 'python-dark', label: ' Python' }
        ],
        repoUrl: 'https://github.com/rirannda/tool-b',
        isFeatured: false
    }
];