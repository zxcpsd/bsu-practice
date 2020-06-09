
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.*;

public class editServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
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

            try {
                HttpSession session = req.getSession();
                int authorId = (int)session.getAttribute("ID");

                JSONObject jsonObject;
                jsonObject = new JSONObject(jb.toString());
                String description = jsonObject.getString("description");
                String hashtags = jsonObject.getString("hashTags");
                String photoLink = jsonObject.getString("photoLink");
                int id = Integer.parseInt(jsonObject.getString("id"));
                if (!authorizationService.isAvailable(id,authorId)) {
                    resp.sendError(HttpServletResponse.SC_FORBIDDEN);
                    return;
                }
                StringBuilder queryEdit = new StringBuilder("UPDATE POST ");
                queryEdit.append("SET ");
                if (description != null) {
                    queryEdit.append("DESCRIPTION = '").append(description).append("'");
                }
                if (hashtags != null) {
                    if (description != null) queryEdit.append(", ");
                    queryEdit.append(" HASHTAGS = '").append(hashtags).append("'");
                }
                if (photoLink != null) {
                    if (description != null || hashtags != null) queryEdit.append(", ");
                    queryEdit.append(" PHOTO_LINK = '").append(photoLink).append("'");
                }
                queryEdit.append(" WHERE POST_ID = ").append(id);
                System.out.println(queryEdit.toString());
                statement = connection.prepareStatement(
                        queryEdit.toString());
                statement.executeUpdate();

            } catch (JSONException e) {
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.getOutputStream().print("sql exception");
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            try {
                statement.close();
                connection.close();
            } catch (NullPointerException e) {
                e.printStackTrace();
            }
            catch (SQLException e) {
                e.printStackTrace();
            }

        }
    }
}
