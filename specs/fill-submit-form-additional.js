async function fillFormUsingJson(json){
    data = JSON.parse(json)
    for (const key in data){
        if(key === 'email'){
            await $('#email').setValue(data[key])
        }
        if(key === 'password'){
            await $('#password').setValue(data[key])
        };               
    }   
}; 

describe('Fill the form User', function(){    
    
    before('log in', async function(){
        await browser.maximizeWindow();
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $ ('button').click();
        await $('#spinner').waitForDisplayed({reverse:true, timeout:15000})

    })
    it('should enter user data', async function(){
        await $('*[href="./formUser.html"]').click();
        const a = '{"email": "soap@email.com", "password": "12345"}'
        fillFormUsingJson(a);              
        await $('*[name="address1"]').setValue('test address1');
        await $('*[name="address2"]').setValue('test address2');
        await $('*[name="city"]').setValue('Minsk');        
        await $('button[type="submit"]').click();
        await browser.pause(1000)
    })
})