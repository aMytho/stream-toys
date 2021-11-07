import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private paimonAccesstoken: string;
    private glimboiAccesstoken: string;
    private mythoAccesstoken: string;

    constructor(
        private configService: ConfigService,
        private httpService: HttpService
    ) { }

    public async load() {
        let getAllTokens = this.configService.get("getAllTokens");
        let tempToken = this.configService.get("tempToken");
        if (getAllTokens == "true") {
            await this.getAccessTokens();
        } else {
            this.paimonAccesstoken = tempToken;
        }
        return this
    }

    /**
     * Get access tokens for the different accounts
     */
    async getAccessTokens() {
        const paimonURL = this.getURL(
            this.configService.get<string>('paimonClientID'),
            this.configService.get<string>('paimonSecretID'),
        );

        const glimboiURL = this.getURL(
            this.configService.get<string>('glimboiClientID'),
            this.configService.get<string>('glimboiSecretID'),
        );

        const mythoURL = this.getURL(
            this.configService.get<string>('mythoClientID'),
            this.configService.get<string>('mythoSecretID'),
        );

        let paimonResponse = this.httpService.post(paimonURL).forEach(token => {
            this.paimonAccesstoken = token.data.access_token;
        })

        let glimboiResponse = this.httpService.post(glimboiURL).forEach(token => {
            this.glimboiAccesstoken = token.data.access_token;
        });

        let mythoResponse = this.httpService.post(mythoURL).forEach(token => {
            this.mythoAccesstoken = token.data.access_token;
        });

        const tokens = await Promise.all([paimonResponse, glimboiResponse, mythoResponse]);
        return tokens;
    }

    private getURL(clientID: string, clientSecret: string) {
        return `https://glimesh.tv/api/oauth/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
    }

    public getAllTokens() {
        return {
            paimon: this.paimonAccesstoken,
            glimboi: this.glimboiAccesstoken,
            mytho: this.mythoAccesstoken
        }
    }

    public getPaimonToken() {
        return this.paimonAccesstoken;
    }

    public getGlimboiToken() {
        return this.glimboiAccesstoken;
    }

    public getMythoToken() {
        return this.mythoAccesstoken;
    }
}