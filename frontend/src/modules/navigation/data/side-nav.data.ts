import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    // {
    //     text: '',
    //     items: ['dashboard'],
    // },
    {
        text: '',
        items: ['declaration', 'progress', 'analysis', 'population', 'insert', 'survey'],
    },
];

export const sideNavItems: SideNavItems = {
    // dashboard: {
    //     icon: 'tachometer-alt',
    //     text: 'Trang chủ',
    //     link: 'app/dashboard',
    // },
    declaration: {
        icon: 'id-card',
        text: 'Quản lý tài khoản',
        link: '/app/declare',
    },
    progress: {
        icon: 'chart-pie',
        text: 'Theo dõi tiến độ',
        link: 'app/progress',
    },
    analysis: {
        icon: 'chart-bar',
        text: 'Phân tích số liệu',
        link: 'app/analysis',
    },
    population: {
        icon: 'list-ul',
        text: 'Quản lý dân số',
        link: 'app/population',
    },
    insert: {
        icon: 'keyboard',
        text: 'Nhập liệu',
        link: 'app/insert'
    },
    survey: {
        icon: 'print',
        text: 'In phiếu khảo sát',
        link: 'app/survey',
    }
};

export const sideNavSectionsForB2: SideNavSection[] = [
    // {
    //     text: '',
    //     items: ['dashboard'],
    // },
    {
        text: '',
        items: ['insert'],
    },
];

export const sideNavItemsRorB2: SideNavItems = {
    insert: {
        icon: 'keyboard',
        text: 'Nhập liệu',
        link: 'app/insert'
    }
};
