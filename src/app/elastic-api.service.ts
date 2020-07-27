import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticApiService {
  public listOfTodo = [];
  private options = {};
  private apiServer = '<ADD_YOUR_ELASTIC_SERVER_URL>'; // http:localhost:9200 (if installed locally)
  private username ='<ADD_YOUR_ELASTICSEARCH_USERNAME>'; // elastic (default)
  private password = '<PASSWORD_FOR_ABOVE_USER>'; //password for elastic user
  private indexName = 'todo'

  constructor(
    private http: HttpClient
  ) { 
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    }

    if (this.apiServer.includes('localhost')) {
      this.options = { ... this.options, withCredentials: true}
    }
  }

  async addTodo(todo) {
    try {
      const data = {
        "text": todo
      }
      const result = await this.http.post(this.apiServer + `/${this.indexName}/_doc`, data, this.options).toPromise();
      console.log('Result = ', result)
      this.listOfTodo.push({
        '_id': result['_id'],
        'text': todo
      })
      /************
       * Sample response
        {
          "_index" : "todo",
          "_type" : "_doc",
          "_id" : "83rnjHMBborOyUJoHMGL",
          "_version" : 1,
          "result" : "created",
          "_shards" : {
            "total" : 2,
            "successful" : 1,
            "failed" : 0
          },
          "_seq_no" : 0,
          "_primary_term" : 1
        } 
       */
    } catch (err) {
      console.log('error in fetching data ', err)
      return []
    }
  }

  async getAllTodos() {
    try {
      const data = {
        "query": {
          "match_all": {}
        }
      }
      const result = await this.http.post(this.apiServer + `/${this.indexName}/_search`, data, this.options).toPromise();
      console.log('Result = ', result)
      return this.parseResult(result)
      /*
        sample response
        {
          "took" : 30,
          "timed_out" : false,
          "_shards" : {
            "total" : 1,
            "successful" : 1,
            "skipped" : 0,
            "failed" : 0
          },
          "hits" : {
            "total" : {
              "value" : 1,
              "relation" : "eq"
            },
            "max_score" : 1.0,
            "hits" : [
              {
                "_index" : "todo",
                "_type" : "_doc",
                "_id" : "83rnjHMBborOyUJoHMGL",
                "_score" : 1.0,
                "_source" : {
                  "text" : "my first todo"
                }
              }
            ]
          }
        }
      */
    } catch(err) {
      console.log('error in fetching data ', err)
      return []
    }
  }

  parseResult(result) {
    this.listOfTodo = [];
    if (result.hits && result.hits.hits) {
      result.hits.hits.forEach(todoObject => {
        this.listOfTodo.push({
          '_id': todoObject['_id'],
          ...todoObject['_source']
        })
      });
    }
    return this.listOfTodo
  }

  async deleteTodo(index, _id) {
    try {
      const result = await this.http.delete(this.apiServer + `/${this.indexName}/_doc/${_id}`, this.options).toPromise();
      console.log('Result = ', result)
      this.listOfTodo.splice(index, 1)
      /*
      Sample Response
      {
        "_index" : "todo",
        "_type" : "_doc",
        "_id" : "83rnjHMBborOyUJoHMGL",
        "_version" : 4,
        "result" : "deleted",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 3,
        "_primary_term" : 1
      }
      */
    } catch (err) {
      console.log('error in fetching data ', err)
    }
  }

  async updateTodo(index, _id, text) {
    try {
      const data = {
        "doc": {
          "text": text
        }
      }
      const result = await this.http.post(this.apiServer + `/${this.indexName}/_update/${_id}`, data, this.options).toPromise();
      console.log('Result = ', result)
      /*
      Sample response
      {
        "_index" : "todo",
        "_type" : "_doc",
        "_id" : "83rnjHMBborOyUJoHMGL",
        "_version" : 2,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1
      }
      */
    } catch (err) {
      console.log('error in fetching data ', err)
    }
  }
}
