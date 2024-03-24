import { Global, Module } from '@nestjs/common';
import { CookieService } from './cookie.service';

@Global()
@Module({
    // imports: [ConfigModule], //This makes your module's dependencies clear and understandable, and also provides better isolation and testability since each module explicitly declares what it needs to work., but it will work without import
    providers: [CookieService],
    exports: [CookieService],
})
export class CookieModule {}
