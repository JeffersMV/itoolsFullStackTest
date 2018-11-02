import {RouterModule, Routes} from "@angular/router";
import {AuthorComponent} from "./components/author/author.component";
import {BookComponent} from "./components/book/book.component";
import {DetailsAuthorComponent} from "./components/author/details-author/details-author.component";
import {AddAuthorComponent} from "./components/author/add-author/add-author.component";
import {AddBookComponent} from "./components/book/add-book/add-book.component";
import {DetailsBookComponent} from "./components/book/details-book/details-book.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'authors', component: AuthorComponent,
        children: [
            {path: 'details-author/:id', component: DetailsAuthorComponent},
            {path: 'add-author', component: AddAuthorComponent}
        ]
    },
    {
        path: 'books', component: BookComponent,
        children: [
            {path: 'details-book/:id', component: DetailsBookComponent},
            {path: 'add-book', component: AddBookComponent}
        ]

    },

// otherwise redirect to home
{
    path: '**', redirectTo
:
    'authors'
}
]
;

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
