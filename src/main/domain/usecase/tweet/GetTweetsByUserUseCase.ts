import {Observable} from "rxjs"
import {Tweet} from "@/domain/model/Tweet"

export interface GetTweetsByUserUseCase {
    run(username: string): Observable<Tweet[]>
}
