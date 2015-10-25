package Kyle.ElucidateApp;

import java.io.IOException;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.clarifai.api.ClarifaiClient;
import com.clarifai.api.RecognitionRequest;
import com.clarifai.api.RecognitionResult;
import com.clarifai.api.Tag;

/**
 * Hello world!
 *
 */
@Controller
public class App 
{
	private String APP_ID="2fZV8HRVayKtAt5K3LFB7odjDHJtr1o86IUomxHk";
	private String APP_SECRET = "h1sFhFIACosXqrnzCgE7lbRzfx7JDeWvq8KigURP";
	@RequestMapping(value = "/index", method=RequestMethod.GET)
	public ModelAndView handleIndex(Model map){
		return new ModelAndView("index","message","");
	}
	
	@RequestMapping(value = "/Kyle", method=RequestMethod.POST)
	public ModelAndView handleKyle(@RequestParam("pic") MultipartFile file, Model map) throws IOException{
		String tags="";
		String probs="";
		if (!file.isEmpty()) {
			StringBuilder sb = new StringBuilder();
    		sb.append("data:image/png;base64,");
    		sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(file.getBytes(), false)));

    	    ClarifaiClient clarifai = new ClarifaiClient(APP_ID, APP_SECRET);
    	    List<RecognitionResult> results = clarifai.recognize(new RecognitionRequest(file.getBytes()));

    	    for(Tag t : results.get(0).getTags()) {
    	    	tags += t.getName() + " ";
    	    	probs += t.getProbability() + " ";
    	    }
    	    
		}
		
		
		return new ModelAndView("Kyle","clarifai",tags + " " + probs);
	}
	
    public static void main( String[] args )
    {
    }
}
