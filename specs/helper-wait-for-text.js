async function waitForText(selector, text, timeout){        
    await browser.waitUntil(
        async () => {
            return  (await $(selector).isDisplayed()) && (await $(selector).getText() === text)
        },
        {
            timeout: timeout,
            timeoutMsg: "The element has wrong text",
        })
};

describe('Check status', function(){
    
    before('log in', async function(){       
        await browser.maximizeWindow();
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $ ('button').click();
        await $('#spinner').waitForDisplayed({reverse:true, timeout:15000})

    })
    it('should check status', async function(){
        await $('#status').click(); 
        await waitForText(('#status'), 'Active', 10000);     
        
    } )
})