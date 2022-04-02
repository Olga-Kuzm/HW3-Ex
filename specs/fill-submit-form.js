async function enterData(email,password,address1,address2,zip,description,city){
    await $('//*[@id="email"]').setValue(email);
    await $('//*[@id="password"]').setValue(password);
    await $('//*[@id="address1"]').setValue(address1);
    await $('//*[@id="address2"]').setValue(address2);
    await $('//*[@id="zip"]').setValue(zip);
    await $('//*[@id="description"]').setValue(description);                                   
    await $('//*[@id="state"]').selectByVisibleText('Canada');
    await $('//*[@id="city"]').setValue(city);
    await $('//*[@id="autoComplete_result_1"]').click();
             

}

describe('Fill and submit form',function(){
    before('log in', async function(){
        await browser.maximizeWindow();        
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('//*[@id="login"]').setValue('walker@jw.com');
        await $('//*[@id="password"]').setValue('password');
        await $('button').click();        
        await $('//*[@id="spinner"]').waitForDisplayed({timeout : 15000, reverse : true});

    });
    context('entering data', function(){
        it('should enter data for first manager', async function(){
            await $('//*[@id="first-nav-block"]/li[8]/a').click();
            enterData('abc@abc.com', 1111, '1234 Road', '4321 Road', 1234,'description1', 'Minsk'); 
            await browser.pause(1000)                                                    
            await $('button[type="submit"]').click();
            

        });
        it('should enter data for second manager', async function(){
            await $('//*[@id="first-nav-block"]/li[8]/a').click();
            enterData('def@def.com', 2222, '1234 Street', '4321 Street', 9876, 'description2', 'Brest');
            await browser.pause(1000)                                           
            await $('button[type="submit"]').click();            

        })
    });
    context('list of users check', function(){
        it('should check data for first manager', async function(){
            const email = await $('//div[@class="tabulator-table"]/*[2]').$('./*[1]');           
            const address1 = await $('//div[@class="tabulator-table"]/*[2]').$('./*[3]');
            const address2 = await $('//div[@class="tabulator-table"]/*[2]').$('./*[4]');
            const city = await $('//div[@class="tabulator-table"]/*[2]').$('./*[5]');
            const state = await $('//div[@class="tabulator-table"]/*[2]').$('./*[6]');
            const zip = await $('//div[@class="tabulator-table"]/*[2]').$('./*[7]');
            const description = await $('//div[@class="tabulator-table"]/*[2]').$('./*[8]');

            await expect (email).toHaveTextContaining('abc@abc.com');
            await expect (address1).toHaveTextContaining('1234 Road');
            await expect (address2).toHaveTextContaining('4321 Road');
            await expect (city).toHaveTextContaining('Minsk');
            await expect (state).toHaveTextContaining('CA');
            await expect (zip).toHaveTextContaining('1234')
            await expect (description).toHaveTextContaining('description1')

        })
        it('should check data for second manager', async function(){
            const email = await $('//div[@class="tabulator-table"]/*[3]').$('./*[1]');           
            const address1 = await $('//div[@class="tabulator-table"]/*[3]').$('./*[3]');
            const address2 = await $('//div[@class="tabulator-table"]/*[3]').$('./*[4]');
            const city = await $('//div[@class="tabulator-table"]/*[3]').$('./*[5]');
            const state = await $('//div[@class="tabulator-table"]/*[3]').$('./*[6]');
            const zip = await $('//div[@class="tabulator-table"]/*[3]').$('./*[7]');
            const description = await $('//div[@class="tabulator-table"]/*[3]').$('./*[8]');

            await expect (email).toHaveTextContaining('def@def.com');
            await expect (address1).toHaveTextContaining('1234 Street');
            await expect (address2).toHaveTextContaining('4321 Street');
            await expect (city).toHaveTextContaining('Brest');
            await expect (state).toHaveTextContaining('CA');
            await expect (zip).toHaveTextContaining('9876')
            await expect (description).toHaveTextContaining('description2')

        })
    })
})
