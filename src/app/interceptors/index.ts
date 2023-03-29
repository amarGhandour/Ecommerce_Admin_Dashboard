import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTInterceptor} from "@/interceptors/jwt.interceptor";
import {LoadingInterceptor} from "@/interceptors/loading.interceptor";

export  const httpInterceptorsProviders = [
{
  provide: HTTP_INTERCEPTORS,
  useClass: JWTInterceptor,
  multi: true
},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
]
