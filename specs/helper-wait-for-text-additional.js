describe('Check status', function(){    
       
    before('log in', async function(){
        await browser.addCommand("waitForText", async function (text, timeout) {        
            await browser.waitUntil(
                async () => {
                    return await this.isDisplayed() && await this.getText() === text
                },
                {
                    timeout: timeout,
                    timeoutMsg: "The element has wrong text",
                })
        }, true)       
               
        await browser.maximizeWindow();
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $ ('button').click();
        await $('#spinner').waitForDisplayed({reverse:true, timeout:15000})

    })
    it('should check status', async function(){
        await $('#status').click();         
        await $('#status').waitForText('Active', 10000);               
        
    } )
})