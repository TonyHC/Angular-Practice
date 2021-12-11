import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    // Another way to handle errors using a Subject
    error = new Subject<string>();

    constructor(private http: HttpClient) {

    }

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};

        // Send Http request and assign the response (return) type once the http request is done
        // If no component(s) care about the observable, then subscribe in service class
        this.http.post<{name: string}>('https://angular-http-requests-41a08-default-rtdb.firebaseio.com/posts.json', 
            postData,
            {
                // Get the whole response instead of just the response body
                observe: 'response'
            }
        )
        .subscribe(responseData => {
            console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        // Assign the response (return) type once the http request is done
        // If some component(s) care about the observable, then return the observable and the interested components subscribed to this observable
        return this.http
            .get<{[key: string]: Post}>('https://angular-http-requests-41a08-default-rtdb.firebaseio.com/posts.json',
                {
                    // Setting header(s) (applies to any http verb)
                    headers: new HttpHeaders({'Custom-Header': 'Hello'}),
                    // Setting query params
                    params: searchParams
                }
            )
            .pipe(
                map(responseData  => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorResult => { // Handle generic errors
                    return throwError(() => new Error(errorResult.message));
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://angular-http-requests-41a08-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events', // Tells Angular what parts of the whole response you want
                responseType: 'json' // Set the response body type
            }
        ).pipe(tap(event => { // tap(): doesn't interrupt the normal observable data flow and allows you to do something while response goes through automatically
            console.log(event);

            // If you want fine grain control over how to update the ui and which phase your request is currently in
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}