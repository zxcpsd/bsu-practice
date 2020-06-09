import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class deleteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
            String user = "root";
            String password = "123";
            connection = DriverManager.getConnection(url,user,password);
            int id  = Integer.parseInt(req.getParameter("id"));
            HttpSession session = req.getSession();
            System.out.println("Session ID: " + session.getAttribute("ID"));
            int authorId = (int)session.getAttribute("ID");
            if (!authorizationService.isAvailable(id,authorId)) {
                resp.sendError(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
            connection.setAutoCommit(false);
            statement = connection.prepareStatement("DELETE FROM POST WHERE POST_ID = ?");
            statement.setInt(1,id);
            statement.executeUpdate();
            statement = connection.prepareStatement("DELETE FROM LIKES WHERE POST_ID = ?");
            statement.setInt(1,id);
            statement.executeUpdate();
            connection.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }


    }
}
