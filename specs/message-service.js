const {
    startClientPC,
    startSatelite,
    stopClientPC,
    stopEarthServer,
    stopSatelite,
    stopMarsServer,
    startEarthServer,
    startMarsServer,
    sendMessage,
    assertResponse
} = require('./stubs/messageservice.stubs');

describe('Send message', function(){

    before('prepare token', function(){
        getToken = function (){
            const earthToken = startEarthServer();
            const marsToken = startMarsServer();
            return {
                mars: marsToken,
                earth: earthToken,
            }
        };
    });   
    
    beforeEach('start nodes', function(){
        startClientPC();
        startSatelite();        
        getToken();       
    });
    afterEach('stop nodes', function(){
        stopSatelite();
        stopClientPC();
        stopEarthServer();
        stopMarsServer()
    });
    context('message to Earth', function(){
        
        it('should send successful message to Earth', function(){
            const token = getToken().earth
            const response = sendMessage('Hello', 'Earth', token);
            assertResponse(response, 'Success')
        });
        it('should send message with invalid token', function(){
            const response = sendMessage('Hello', 'Earth', 'X000');
            assertResponse(response, 'Security Error')
        });
        
        
    });
    context('message to Mars', function(){
        it('should send successful message to Mars', function(){
            const token = getToken().mars
            const response = sendMessage('Hello', 'Mars', token);
            assertResponse(response, 'Success')
        });
        it('should send message with invalid token', function(){            
            const response = sendMessage('Hello', 'Mars', 'X000');
            assertResponse(response, 'Security Error')
        });
        it('should send message with valid token and stopped satellite', function(){
            const token = getToken().mars;
            stopSatelite();
            const response = sendMessage('Hello', 'Mars', token);
            assertResponse(response, 'Service is unavailable')
        });
        it('should send message with invalid token and stopped satellite', function(){                        
            stopSatelite();
            const response = sendMessage('Hello', 'Mars', 'X000');            
            assertResponse(response, 'Service is unavailable')
        })

    })
})
  