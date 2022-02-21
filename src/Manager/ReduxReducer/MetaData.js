import axios from 'axios';

export const metadata = () => {
    let path = 'https://jsonplaceholder.typicode.com/users/'
    axios.get(path).then(
        (response) => {
            let result = response.data;
            console.log(result);
            return result
            
        },
        (error) => {
            console.log(error);
        }
    );
}
metadata()