export interface MenuItem {
    id?: string;
    label: string;
    faIcon?: string;
    icon?: string;
    imageIcon?: string;
    hidden?: boolean;
    link?: string;
    externalRedirect?: boolean;
    data?: any;
    items?: MenuItem[];
    onSelected?: Function;
}
