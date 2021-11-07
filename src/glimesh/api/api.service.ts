import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiService {
    constructor(
        private httpService: HttpService,
        @Inject('ASYNC_CONNECTION')
        private authService: AuthService
    ) { }

    private async glimeshQuery(query: string): Promise<any> {
        const token = this.authService.getPaimonToken();
        try {
            let glimeshData = {};
            await this.httpService.post(
                'https://glimesh.tv/api/graph', { query: query },
                { headers: { Authorization: `Bearer ${token}` } }
            ).forEach(response => {
                let data = response.data;
                if (data.errors) {
                    glimeshData = this.handleError(data.errors);
                } else {
                    glimeshData = data["data"]
                }
            })
            return glimeshData;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    private handleError(errors: any) {
        console.log(errors);
        return false;
    }

    public async getStreamStatus() {
        let data = await this.glimeshQuery(`query {channel(id: "6") {streamer {countFollowers}, stream {countViewers, metadata(last: 1) {edges {node {streamTimeSeconds}}}}}}`);
        console.log(data);
        return data;
    }
}
