package mongodb.replicaset;

import java.net.UnknownHostException;
import java.util.Arrays;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;

public class Read {
	public static void main( String[] args ) throws UnknownHostException, InterruptedException
    {
        MongoClientOptions options = MongoClientOptions.builder().readPreference(
                ReadPreference.secondary()).build();
        @SuppressWarnings("resource")
        MongoClient client = new MongoClient(Arrays.asList(
					 new ServerAddress("localhost", 30001),
					 new ServerAddress("localhost", 30002),
					 new ServerAddress("localhost", 30003)
				), options);
        MongoCollection<Document> collection = client.getDatabase("samples").getCollection("ids");
        
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
        	try {
        		Document document = collection.find().sort(new Document("_id", -1)).first();
        		System.out.println("Readed : " + document.get("_id").toString());
        	}
        	catch (Exception exception) {
        		System.out.println(exception.getMessage());
        	}
        	Thread.sleep(500);
        }
    }
}
