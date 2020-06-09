import com.mysql.cj.result.SqlDateValueFactory;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;

public class loginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String name = new String(Base64.decodeBase64(req.getParameter("username")));
        String userPassword = DigestUtils.sha256Hex(new String(Base64.decodeBase64(req.getParameter("password"))));
        boolean loginSuccess = false;
        if (name != null && userPassword != null) {
            loginSuccess = login(name,userPassword,req,resp);
        }
        if (!loginSuccess) {
            HttpServletResponse servletResponse = (HttpServletResponse) resp;
            servletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
        }

    }
    private boolean login(String username, String password, HttpServletRequest req, HttpServletResponse resp) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet rs = null;
        try {
            String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
            String sqlUser = "root";
            String sqlPassword = "123";
            connection = DriverManager.getConnection(url,sqlUser,sqlPassword);
            statement = connection.prepareStatement("SELECT USER_ID,NAME FROM USER WHERE NAME = ? AND PASSWORD = ?");
            statement.setString(1,username);
            statement.setString(2,password);
            rs = statement.executeQuery();
            if (rs.next()) {
                int id = rs.getInt(1);
                String name = rs.getString(2);
                HttpSession session = req.getSession();
                session.setAttribute("ID", id);
                JSONObject obj = new JSONObject();
                obj.put("id",id);
                obj.put("name",name);
                resp.setContentType("application/json; charset=utf-8");
                resp.setCharacterEncoding("UTF-8");
                resp.getOutputStream().write(
                        obj.toString().getBytes("UTF-8"));
                System.out.println("User <"+username+"> found with id: "+id);
                return true;
            }
            else {
                System.out.println("User <"+username+"> not found.");
                return false;
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (statement != null) statement.close();
                if (rs != null) rs.close();
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
}
