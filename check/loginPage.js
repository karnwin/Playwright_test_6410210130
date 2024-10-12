class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginSuccessLocator = '[data-test="title"]';
        this.loginErrorLocator = '[data-test="error"]';
    }

    // ตรวจสอบการล็อคอินสำเร็จ
    async verifyLoginSuccess() {
        await this.page.waitForSelector(this.loginSuccessLocator);
        const titleText = await this.page.textContent(this.loginSuccessLocator);
        if (titleText !== 'Products') {
            throw new Error('Login success verification failed.');
        }
    }

    // ตรวจสอบการล็อคอินล้มเหลว
    async verifyLoginError() {
        await this.page.waitForSelector(this.loginErrorLocator);
        const errorText = await this.page.textContent(this.loginErrorLocator);
        if (errorText !== 'Epic sadface: Username and password do not match any user in this service') {
            throw new Error('Login error verification failed.');
        }
    }
}

module.exports = LoginPage;
