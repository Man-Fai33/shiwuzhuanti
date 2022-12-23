/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mongotest;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

/**
 *
 * @author user
 */
public class MongoTest {

    MongoClient mongoClient;
    DBCollection col;
    public MongoTest() {
        mongoClient = new MongoClient("localhost", 27017);
    }
    private void exec() {
        System.out.println("databases " + mongoClient.getDatabaseNames());
        DB db = mongoClient.getDB("test");
        System.out.println("coll names=" + db.getCollectionNames());
        col = db.getCollection("users");
//        insertOne();
//        insertMany(col);
//        find(col, null);
//        find(col,  new BasicDBObject("username", "david")); 
//        find(col,  new BasicDBObject("sarea", "信義區")); 
        retrieveRange(col);
//        col.drop();

    }
    private BasicDBObject createDBObject(String jsonString) {
        return new BasicDBObject(BasicDBObject.parse(jsonString));
    }
    
    private static void retrieveRange(DBCollection collection) {
//        BasicDBObject criteria = createDBObject("{\"i\":{\"gt\":20, \"lte\":30}}");
        BasicDBObject criteria = new BasicDBObject("i", new BasicDBObject("$gt", 20).
                append("$lte", 30)); // 20 < i && i <= 30 --> JSON object { 20 < i, i <= 30}
        System.out.println(criteria);
        try(DBCursor cursor = collection.find(criteria)) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next());
            }            
        }
    }

    private void insertOne() {
        BasicDBObject doc = new BasicDBObject("username", "david")
                .append("password", "0000")
                .append("location", new BasicDBObject("x", 203).append("y", 102));
        col.insert(doc, WriteConcern.JOURNALED);
        find(col, null);
    }

    private void insertMany(DBCollection col) {
        for (int i = 0; i < 100; i++) {
            col.insert(new BasicDBObject("i", i));
        }
        System.out.println(col.getCount());
    }

    private void find(DBCollection col, DBObject criteria) {
        try(DBCursor cursor = criteria == null ? col.find() : col.find(criteria)) {
//            System.out.println("length "+cursor.length());
            while (cursor.hasNext()) {
                DBObject obj = cursor.next();
                System.out.println("obj = " + obj);
            }            
        }
    }
    
    private void find(DBObject criteria) {
        try(DBCursor cursor = criteria == null ? col.find() : col.find(criteria)) {
            while (cursor.hasNext()) {
                System.out.println("obj = " + cursor.next());
            }
        }
    }    

    public static void main(String[] args) {
        new MongoTest().exec();
    }    
}
