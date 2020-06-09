import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

//
public class addServlet extends HttpServlet {
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
            try {
                BufferedReader reader = req.getReader();
                while ((line = reader.readLine()) != null)
                    jb.append(line);
                System.out.println(jb.toString());
            } catch (Exception e) {
                System.out.println("exc");
            }
             JSONObject jsonObject = new JSONObject(jb.toString());
             String description = jsonObject.getString("description");
             String hashtags = jsonObject.getString("hashTags");
             String photoLink = jsonObject.getString("photoLink");
             int id = jsonObject.getInt("id");
             LocalDateTime time = LocalDateTime.now().plusHours(3);
             statement = connection.prepareStatement(
                     "INSERT INTO POST(USER_ID,DESCRIPTION,CREATED_AT,PHOTO_LINK,LIKES_COUNT,HASHTAGS) VALUES(?,?,?,?,?,?)");
             statement.setInt(1,id);
             statement.setString(2,description);
             statement.setObject(3,time);
             statement.setString(4,photoLink);
             statement.setInt(5, 0);
             statement.setString(6,hashtags);
             statement.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
            try {
                if (statement != null) statement.close();
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        }

}
