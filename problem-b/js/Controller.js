'use strict';

import readline from 'readline-sync';

import * as model from './Model';
import { printTweets } from './View';

export function runSearch() {
    console.log("Here are some tweets by @UW_iSchool");
    let recent = model.getRecentTweets();
    printTweets(recent);

    let response = readline.question("Search tweets, or EXIT to quit: ");
    if(response == "EXIT") {
        return;
    }
    
    let results = model.searchTweets(response);
    printTweets(results);
}