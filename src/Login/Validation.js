
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