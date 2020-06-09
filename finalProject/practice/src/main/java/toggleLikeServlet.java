import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class toggleLikeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int authorId = Integer.parseInt(req.getParameter("authorid"));
        int postId = Integer.parseInt(req.getParameter("postid"));
        if (authorId == 0) return;
        boolean isLiked = Boolean.parseBoolean(req.getParameter("isliked"));
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
            String user = "root";
            String password = "123";
            connection = DriverManager.getConnection(url,user,password);
            connection.setAutoCommit(false);
            if (!isLiked) {
                statement = connection.prepareStatement(
                        "UPDATE POST SET LIKES_COUNT = LIKES_COUNT + 1 WHERE POST_ID = ? ");
                statement.setInt(1,postId);
                statement.executeUpdate();
                statement = connection.prepareStatement("INSERT LIKES(USER_ID,POST_ID) VALUES(?,?)");
                statement.setInt(1,authorId);
                statement.setInt(2,postId);
                statement.executeUpdate();
                connection.commit();
            } else {
                statement = connection.prepareStatement(
                        "UPDATE POST SET LIKES_COUNT = LIKES_COUNT - 1 WHERE POST_ID = ? ");
                statement.setInt(1,postId);
                statement.executeUpdate();
                statement = connection.prepareStatement("DELETE FROM LIKES WHERE USER_ID = ? AND POST_ID = ?");
                statement.setInt(1,authorId);
                statement.setInt(2,postId);
                statement.executeUpdate();
                connection.commit();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
