export class CookieModule {
    private readonly ONE_HOUR = 3600;
    private readonly ONE_MONTH = 3600 * 24 * 30;
    private readonly COMMONDOMAIN = 'to-do';
    /**
     * Save AccessToken
     * @param accessToken
     */
    public setToken(accessToken: string, saveSession: boolean = undefined): void {
        const timeToLive = (saveSession) ? undefined : 30 ;
        this.setCookie('access_token', accessToken);
    }
    /**
     * Get AccessToken
     */
    public getToken(): string {
        return this.getCookie('access_token');
    }

    public clearTokens() {
        this.deleteAllCookies();
    }

    private setCookie(cookieName: string, value: string): void {
        const locationHostname = window.location.hostname;
        if (locationHostname !== 'localhost') {
          const expiration = `max-age=${this.ONE_MONTH};`;
          document.cookie = `${cookieName}=${value};Path=/; domain=${this.COMMONDOMAIN}; ${expiration}`;
        } else {
          // If we're running in localhost we just ignore the domain parameter
          const expiration = `max-age=${this.ONE_HOUR};`;
          document.cookie = `${cookieName}=${value};Path=/; ${expiration}`;
        }
      }

      getCookie(cookieName: string): string {
        const cookie: string = cookieName + '=';
        let cookieValue = '';
        const allCookiesArray: string[] = this.getAllCookies();
        allCookiesArray.forEach(cookieItem => {
          const trimmedCookie = cookieItem.trim();
          const cookieIndex = trimmedCookie.indexOf(cookie);
          if (cookieIndex !== -1) {
            cookieValue = trimmedCookie.substring(cookie.length, trimmedCookie.length);
          }
        });
        return cookieValue;
      }

      deleteCookie(cookieName: string): void {
        const cookie: string = cookieName + '=';
        const oneSecond = 1;

        document.cookie = `${cookie};Path=/;max-age=${oneSecond}`;
      }

      deleteAllCookies(): void {
        const allCookiesArray: string[] = this.getAllCookies();
        allCookiesArray.forEach((cookie: string) => {
          let cookieName: string = cookie.split('=')[0];
          cookieName = cookieName.trim();
          this.deleteCookie(cookieName);
        });
      }

      private getAllCookies(): string[] {
        return document.cookie.split(';');
      }
}