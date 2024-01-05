import { TokenModule as TokenModule } from './tokenModule';

describe('[UnitTesting] cookieModule', () => {
    const sut = new TokenModule();
    const mockToken = 'mocked token';

    afterEach(() => {
        sut.clearTokens();
    });

    it('setToken() works with saveSession flag', () => {
        sut.setToken(mockToken, true);

        const expected = mockToken;
        const actual = sut.getToken();

        expect(actual).toBe(expected);
    });

    it('setToken() works without saveSession flag', () => {
        sut.setToken(mockToken);

        const expected = mockToken;
        const actual = sut.getToken();

        expect(actual).toBe(expected);
    });

    it('getToken() return empty string if token cookie has not been saved before', () => {
        const expected = '';
        const actual = sut.getToken();

        expect(actual).toBe(expected);
    });

    it('getToken() return non-empty string if token cookie has been saved before', () => {
        sut.setToken(mockToken);

        const expected = mockToken;
        const actual = sut.getToken();

        expect(actual).toBe(expected);
    });
});
