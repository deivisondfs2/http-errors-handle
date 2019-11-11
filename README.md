# http-errors-handle

Module responsible for encapsulating all http error requests and returns the correct exception.

## Example

```js
const httpErrorsHandle = require('http-errors-handle');
const axios = require('axios');
var app = express();

app.use(async function (req, res, next) {
    try {
            const request = axios.get("http://example.test/");
            const resp = await httpErrorsHandle(request);
            next()
        } catch (e) {
            next(e)
            //if it's a 400 error we'll have the following object:
            /**
                {
                "message":"Bad Request",                
                "status":400,
                "statusCode":400
                } 
             **/
            
        }  
})
```

### Error Properties

- `message` - the traditional error message, which should be kept short and all
  single line
- `status` - the status code of the error, mirroring `statusCode` for general
  compatibility
- `statusCode` - the status code of the error, defaulting to `500`

### httpErrorsHandle([request], [message])

Create a new handle error object with the given message `msg`.
The error object inherits from `createError.HttpError`.

<!-- eslint-disable no-undef, no-unused-vars -->

```js
var resp = httpErrorsHandle(request, 'Ops!!! We have a error here...');
```

- `status: 500` - the status code as a number
- `message` - the message of the error, defaulting to node's text for that status code.
```

## License

[MIT]
