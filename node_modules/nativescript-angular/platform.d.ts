import { AppOptions } from "./platform-common";
import { ElementSchemaRegistry, ResourceLoader } from "@angular/compiler";
import { PlatformRef, InjectionToken, ViewEncapsulation, MissingTranslationStrategy } from "@angular/core";
import "./dom-adapter";
import { NativeScriptElementSchemaRegistry } from "./schema-registry";
import { NSFileSystem } from "./file-system/ns-file-system";
import { FileSystemResourceLoader } from "./resource-loader";
export declare const NS_COMPILER_PROVIDERS: (any[] | {
    provide: InjectionToken<{
        useDebug?: boolean;
        useJit?: boolean;
        defaultEncapsulation?: ViewEncapsulation;
        providers?: any[];
        missingTranslation?: MissingTranslationStrategy;
        enableLegacyTemplate?: boolean;
        preserveWhitespaces?: boolean;
    }[]>;
    useValue: {
        providers: (typeof NSFileSystem | {
            provide: typeof ResourceLoader;
            useClass: typeof FileSystemResourceLoader;
        } | {
            provide: typeof ElementSchemaRegistry;
            useClass: typeof NativeScriptElementSchemaRegistry;
        })[];
    };
    multi: boolean;
})[];
export declare function platformNativeScriptDynamic(options?: AppOptions, extraProviders?: any[]): PlatformRef;
