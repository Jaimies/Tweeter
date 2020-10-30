import {Observable} from "rxjs"
import {Tweet} from "@/domain/model/Tweet"

export interface GetFeedUseCase {
    run(): Observable<Tweet[]>
}
