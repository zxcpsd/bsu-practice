import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.io.IOException;
import java.sql.*;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class showPostsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection = null;
        ResultSet rs = null;
        PreparedStatement statement = null;
        ResultSet rs2 = null;
        int userId = Integer.parseInt(req.getParameter("userid"));
        try {
            String url = "jdbc:mysql://localhost:3306/mydb?useUnicode=true&serverTimezone=UTC";
            String user = "root";
            String password = "123";
            connection = DriverManager.getConnection(url,user,password);
            String LIMIT = req.getParameter("skip");
            String OFFSET = req.getParameter("top");
            String AUTHOR = req.getParameter("author");
            String[] hashTags = req.getParameterValues("hashtags");

            String date = req.getParameter("date");
            java.sql.Date dateSQL = new java.sql.Date(123);
            if (date != null) dateSQL = new java.sql.Date(Long.parseLong(date));
            StringBuilder queryString = new StringBuilder("SELECT NAME,POST_ID,DESCRIPTION,CREATED_AT,PHOTO_LINK,LIKES_COUNT,HASHTAGS,POST.USER_ID FROM POST");

            if (AUTHOR != null) {
                AUTHOR = AUTHOR.replace('_',' ');
                queryString.append(" JOIN USER ON USER.NAME = \'").append(AUTHOR).append("\' ");
            }
            else {
                queryString.append(" JOIN USER ");
            }

                queryString.append(" WHERE POST.USER_ID = USER.USER_ID ");

            if (date != null) {
                 queryString.append("AND");
                queryString.append(" DATEDIFF((\'").append(dateSQL).append("\'),CREATED_AT) = 0 ");
            }
            if (hashTags != null) {
                 queryString.append("AND");
                queryString.append(" ( ");
                for (String s:hashTags) {
                    if (!s.equals(hashTags[1])&&!s.equals("")) queryString.append(" OR");
                    if (!s.equals("")) queryString.append(" HASHTAGS LIKE \'%").append(
                            new String(s.getBytes("ISO-8859-1"),"UTF-8")).append("%\' ");
                }
                queryString.append(" ) ");
            }
            queryString.append(" ORDER BY CREATED_AT DESC ");
            queryString.append(" LIMIT ").append(LIMIT).append(" OFFSET ").append(OFFSET);
            statement = connection.prepareStatement(
                    queryString.toString());
//            if (AUTHOR != null) {
//                statement.setString(1,AUTHOR);
//            }
            System.out.println(queryString);
            rs = statement.executeQuery();

            //JSONArray jj = Convertor.convertToJSON(rs);
            //resp.getOutputStream().print("[\n");
            JSONArray ar = new JSONArray();
            int counter = 0;
            while (rs.next()){
                JSONObject obj = new JSONObject();
                obj.put("id",rs.getInt(2));
                obj.put("author",rs.getString(1));
                obj.put("description",rs.getString(3));
                obj.put("createdAt",rs.getString(4));
                obj.put("photoLink",(rs.getString(5) == null) ? "" : rs.getString(5) );
                obj.put("likes",Integer.toString(rs.getInt(6)));
                obj.put("hashTags",(rs.getString(7) == null) ? "" : rs.getString(7) );
                obj.put("author_id",rs.getInt(8));
                //adding isLiked property for current post and author
                statement=connection.prepareStatement("SELECT * FROM LIKES WHERE USER_ID = ? AND POST_ID = ?");
                statement.setInt(1,userId);
                statement.setInt(2,rs.getInt(2));
                rs2 = statement.executeQuery();
                obj.put("liked",rs2.next() ? true : false);
                //
                ar.put(obj);
                counter++;

            }
            System.out.println ("Posts sent: "+counter);
            resp.setContentType("application/json; charset=utf-8");
            resp.setCharacterEncoding("UTF-8");
            resp.getOutputStream().write(
                    ar.toString().getBytes("UTF-8"));
            //resp.getOutputStream().print("\n}");
            //resp.getOutputStream().print(String.valueOf(jj));

        } catch (SQLException e) {
            e.printStackTrace();
            resp.getOutputStream().print("sql exception");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs2 != null) rs2.close();
                if (rs != null ) rs.close();
                statement.close();
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


    }

}
