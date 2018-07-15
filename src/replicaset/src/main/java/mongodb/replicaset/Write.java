package mongodb.replicaset;

import java.net.UnknownHostException;
import java.util.Arrays;

import org.bson.Document;

import com.mongodb.*;
import com.mongodb.client.*;

public class Write 
{
    public static void main( String[] args ) throws UnknownHostException, InterruptedException
    {
				@SuppressWarnings("resource")
				MongoClient client = new MongoClient(Arrays.asList(
					 new ServerAddress("localhost", 30001),
					 new ServerAddress("localhost", 30002),
					 new ServerAddress("localhost", 30003)
				));
        MongoCollection<Document> collection = client.getDatabase("samples").getCollection("ids");
        collection.drop();
        
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
        	try {
        		collection.insertOne(new Document("_id", i));
        		System.out.println("Inserted : " + i);
        	}
        	catch (Exception exception) {
        		System.out.println(exception.getMessage());
        	}
        	Thread.sleep(500);
        }
    }
}
