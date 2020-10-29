import {Observable} from "rxjs"
import {Tweet} from "@/domain/model/Tweet"

export interface GetFeedUseCase {
    run(): Promise<Observable<Tweet[]>>
}
