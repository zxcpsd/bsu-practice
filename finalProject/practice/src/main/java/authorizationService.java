import java.sql.*;

public class authorizationService {
     public static boolean isAvailable(int postId, int userId) {
        String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
        String sqlUser = "root";
        String sqlPassword = "123";
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DriverManager.getConnection(url,sqlUser,sqlPassword);
            statement = connection.prepareStatement("SELECT * FROM POST WHERE POST_ID = ? AND USER_ID = ?");
            statement.setInt(1,postId);
            statement.setInt(2,userId);
            rs = statement.executeQuery();
            if (rs.next()) {
                return true;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                if (rs != null) rs.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                e.printStackTrace();
            }

        }

        return false;
    }
}
