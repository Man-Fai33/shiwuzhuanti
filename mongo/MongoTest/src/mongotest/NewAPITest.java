/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mongotest;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;

/**
 *
 * @author borso
 */
public class NewAPITest {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        MongoClient mongoClient = new MongoClient("localhost", 27017);
        test(mongoClient);
    }

    private static void test(MongoClient mongoClient) {
        
//        MongoDatabase db = mongoClient.getDatabase("test");
//        db.createCollection("contacts");
//        MongoCollection<Document> coll = db.getCollection("contacts");
//        coll.insertOne( new Document("name", "john")
//                .append("age", 34)
//                .append("vip", false));
//        coll.drop();

        MongoDatabase db = mongoClient.getDatabase("mydb");
        MongoCollection<Document> col = db.getCollection("customers");
//        Document doc = new Document("name", "MongoDB")
//                .append("type", "database")
//                .append("count", 1)
//                .append("versions", Arrays.asList("3.2", "3.0", "2.6"))
//                .append("info", new Document("x", 203).append("y", 206));
//        col.insertOne(doc);
//        List<Document> docs = new ArrayList();
//        for (int j = 0; j < 100; j++) {
//            docs.add(new Document("j", j));
//        }
//        col.insertMany(docs);
//        System.out.println(col.find(gte("j", 71)).first().toJson());

//        Block<Document> printBlock = doc -> System.out.println(doc);
//        col.find(and(gt("j", 50), lte("j", 88))).forEach(printBlock); 
//        for(Document document : col.find(and(gt("j", 50), lte("j", 88)))) {
//            System.out.println(document);
//        }
//        MongoCursor<Document> cursor = col.find().iterator();
//        while(cursor.hasNext()) {
//            System.out.println(cursor.next().toJson());
//        }
//        col.updateOne(eq("j", 10), new Document("$set", new Document("j", 110)));
//        col.deleteOne(eq("j", 110));
    }


}
