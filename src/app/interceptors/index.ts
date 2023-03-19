import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTInterceptor} from "@/interceptors/jwt.interceptor";

export  const httpInterceptorsProviders = [
{
  provide: HTTP_INTERCEPTORS,
  useClass: JWTInterceptor,
  multi: true
},
]
