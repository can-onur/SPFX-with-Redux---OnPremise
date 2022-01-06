
  export module Util{
      export class Email{
        public static Validate= (val: string): string | undefined => {
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return val.length > 0 &&  !String(val).toLowerCase().match(re) ? 'Please provide a proper email address' : "";
          };
      }
  }