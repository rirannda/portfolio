export type Work = {
    id: string;
    name: string;
    image: string;     // スクリーンショットのパス
    description: string;
    tech: { color: string; label: string }[]
    repoUrl: string;
    isFeatured: boolean; // trueのものはトップページにも表示する
};

export const worksData: Work[] = [
    {
        id: 'portfolio-os',
        name: 'PortfoliOS',
        image: '/images/portfolio.png', // ※実際のパスに合わせてください
        description: 'SvelteKitとTailwind CSSで構築したCUI風のポートフォリオサイト。',
        tech: [
            { color: '#ff4000', label: ' Svelte' },
            { color: '#01bbff', label: '󱏿 Tailwind CSS' },
            { color: '#3577c4', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/portfolio',
        isFeatured: true // トップページに出したいのでtrue
    },
    {
        id: 'app-a',
        name: 'Awesome App A',
        image: '/images/app-a.png',
        description: 'Reactで作ったすごいアプリ。',
        tech: [
            { color: '#59c3db', label: ' React' },
            { color: '#3577c4', label: ' TypeScript' }
        ],
        repoUrl: 'https://github.com/rirannda/app-a',
        isFeatured: true
    },
    {
        id: 'tool-b',
        name: 'Convenient Tool B',
        image: '/images/tool-b.png',
        description: 'Pythonで作った便利なスクリプト。',
        tech: [
            { color: '#fed34d', label: ' Python' }
        ],
        repoUrl: 'https://github.com/rirannda/tool-b',
        isFeatured: false // これはWorksページにだけ出す
    }
];