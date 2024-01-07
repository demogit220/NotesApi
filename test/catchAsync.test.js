const catchAsync = require("../server/utils/catchAsync")

test('should handle errors thrown by the wrapped function', async () => {
    const mockNext = jest.fn();
    const mockFn = jest.fn().mockRejectedValue(new Error('Something went wrong'));
  
    await catchAsync(mockFn)(null, null, mockNext); // Simulate a request
  
    expect(mockFn).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(new Error('Something went wrong')); // Assert error propagation
  });