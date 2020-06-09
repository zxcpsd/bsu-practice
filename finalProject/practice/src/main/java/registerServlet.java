import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class registerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
            String user = "root";
            String password = "123";
            connection = DriverManager.getConnection(url,user,password);
            StringBuilder jb = new StringBuilder();
            String line;
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);

            JSONObject jsonObject = new JSONObject(jb.toString());
            String username = jsonObject.getString("username");
            String userPassword = jsonObject.getString("password");
            username = new String(Base64.decodeBase64(username));
            userPassword = new String(Base64.decodeBase64(userPassword));
            userPassword = DigestUtils.sha256Hex(userPassword);
            System.out.println("New user registered: "+username+" with hash: "+userPassword);
            statement = connection.prepareStatement("INSERT INTO USER(NAME,PASSWORD) VALUES(?,?)");
            statement.setString(1,username);
            statement.setString(2,userPassword);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
