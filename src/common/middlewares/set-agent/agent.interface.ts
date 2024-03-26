export type UserLocationType = `Country:${string}, city:${string}` | 'Unknown';
export type UserBrowserType = `Browser:${string}, version:${string}` | 'Unknown';
export type UserOsType = string | 'Unknown';

export interface IAgentInfo {
    browser: UserBrowserType;
    os: UserOsType;
    loc: UserLocationType;
    ip: string;
}
