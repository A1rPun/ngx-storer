# Angular x storer

This is a simple module that creates a facade for the localStorage or sessionStorage object.

***Features***
- Familiar API based on the window `Storage`
- Easily hook into store events

***Dependencies***
- @angular/core
- rxjs

## Configuration

First you need to configure the module in `app.module.ts`. You can pass optional configuration options with the static `withConfig()` function.

    import { StorerModule, StorerType } from 'ngx-storer';

    @NgModule({
      imports: [
        StorerModule.withConfig({
          prefix: 'myStore',
          storageType: StorerType.localStorage, // Defaults to local
        }),
      ],
    })

## Usage

Then you can inject the storer in a component or a service.

    import { Storer } from 'ngx-storer';

    @Injectable()
    export class SomeService {
    
      constructor (private storer: Storer) {
        this.storer.set('Hello', 'World!');
        var value = this.storer.get('Hello');
        console.log(value);
      }
    }

## Output

    'World!'
