function tryCatchFinallyDemo() {
    try {
      console.log("Start of the try block");
      throw new Error("Error thrown in try block");
    } catch (error) {
      console.log("catch error:" + error.message);
    } finally {
      console.log("Finally block end");
    }
  }
  
  tryCatchFinallyDemo();
  //Start of the try block
  //catch error:Error thrown in try block
  //Finally block end