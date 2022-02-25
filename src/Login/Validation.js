
export const validtaion = (value) => {
    let errormessageuser = ''
    let errormessagepass = ''
    // let employeelist =[ "Employee1", "Employee2", "Employee3", "Employee4", "Employee5", "Employee6" ];
    // console.log(value.username)
    if(value.username === undefined || value.password === undefined ){
        errormessagepass ='Password is Required'
        errormessageuser = 'Username is Required'
    }
    else if(value.username.toLowerCase() === 'manager'){
        if(value.password === 'manager'){
            errormessagepass =''
        }
        else errormessagepass = 'Username and Password did not match'
    }
    else if(  value.username.toLowerCase() === "employee1" 
            ||value.username.toLowerCase() === "employee2"
            ||value.username.toLowerCase() === "employee3" 
            ||value.username.toLowerCase() === "employee4" 
            ||value.username.toLowerCase() === "employee5" 
            ||value.username.toLowerCase() === "employee6" )
        {
            // console.log('name')
            if(   value.password === "employee1" 
                ||value.password === "employee2"
                ||value.password === "employee3" 
                ||value.password === "employee4" 
                ||value.password === "employee5" 
                ||value.password === "employee6" )
            {
                // console.log('pass')
                errormessagepass =''
            }
            else errormessagepass = 'Username and Password did not match'
        }
    else errormessageuser = 'Invalid Username'


    return { errormessageuser: errormessageuser, errormessagepass: errormessagepass }
}

export const TaskValidation = (value) => {

    let title = value.tasktitle;
    let desc = value.taskdesc;
    let giventime = value.giventime;
    let format = value.timeformat;
    let error = '';
    // console.log(title, desc, giventime, format)
    // console.log(Number.isInteger(Number(giventime)))
    if(!title || !desc || !giventime || !format){
        error = 'Please Fill All Field'
    }
    else {
        if(format === 'Hrs'){
            if(!Number.isInteger(Number(giventime))){
                let myArray = giventime.split(".");
                let zero = myArray[1].split('0');
                let nonsero = !zero[0] ? zero[1] : myArray[1]
                let zerohrs = myArray[0].split('0');
                let nonzerohrs = !zerohrs[0] ? zerohrs[1] : myArray[0]
                if(nonzerohrs < 25){
                    if(nonsero < 61){
                        let hrs = nonzerohrs > 9 ? `${nonzerohrs}` : `0${nonzerohrs}`
                        let min = nonsero > 9 ? `${nonsero}` : `0${nonsero}`
                        giventime = `${hrs}:${min}`
                        // console.log(giventime)
                    }
                    else error ='Invalid Minute'
                }
                else error ='Invalid Hour'
                
            }
            else if(giventime < 24){
                    giventime = giventime > 9 ? `${giventime}:00` : `0${giventime}:00`
                }
            else error = 'Time mut be less than 24 Hrs'
        }
        else if(format === 'Min'){
            if(!Number.isInteger(Number(giventime))){
                error = 'Invalid Minutes'
            }
            else if(giventime > 60){
                error = 'Minutes must be less than 60'
            }
        }
        else if (format === '')
                error = 'Please choose Time format'
    }
        
    
    return {giventime: giventime, format:format, error:error}
}