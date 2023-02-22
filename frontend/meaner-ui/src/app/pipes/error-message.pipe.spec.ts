import { ErrorMessagePipe } from "./error-message.pipe"

describe('ErrorMessagePipe', () => {
    let errorPipe: ErrorMessagePipe;

    beforeEach(() => {
        errorPipe = new ErrorMessagePipe();
    })

    it('should return message for "username taken"', () => {
        const res = errorPipe.transform("username taken");
        expect(res).toBe("This name is taken, please try another one.")
    });

    it('should return default error message', () => {
        let res = errorPipe.transform("");
        expect(res).toBe("Something went wrong, please try again later.")
    })
})