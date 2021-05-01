module.exports = {
    ResponseFormatter: (status, messages, statusCode, data) => {
        const response = {
            status: status,
            messages: messages,
            code: statusCode,
            data: data
        }

        return response;
    }
}