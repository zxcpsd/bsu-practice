/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2020-05-26 15:21:23 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_html extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("    <head>\r\n");
      out.write("        <title>sample title</title>\r\n");
      out.write("\t<meta charset=\"UTF-8\">\r\n");
      out.write("        <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap\" rel=\"stylesheet\">\r\n");
      out.write("        <script src=\"resourses/js/fillStorage.js\"></script>\r\n");
      out.write("        <script src=\"resourses/js/script.js\"></script>\r\n");
      out.write("        <link rel=\"stylesheet\" href=\"resourses/css/styles.css\">\r\n");
      out.write("    </head>\r\n");
      out.write("    <body>\r\n");
      out.write("        <header class=\"header\"> \r\n");
      out.write("        <div class =\"unlogged menu-button login\"><a>Войти</a></div>\r\n");
      out.write("        <div class =\"unlogged menu-button\"><a>Зарегистрироваться</a></div>\r\n");
      out.write("            <div class=\"user-logo hidden logged\">\r\n");
      out.write("                <a class = \"logged hidden\" href=\"https://imgbb.com/\"><img class=\"logo\"src=\"https://i.ibb.co/zPJtQhs/logo.png\" alt=\"logo\"></a>  \r\n");
      out.write("            </div>\r\n");
      out.write("            <a class=\"name-link logged hidden\" href=\"#\"><div class=\"user-name\">Lucas Tyber</div></a>\r\n");
      out.write("        \r\n");
      out.write("        <div class=\"menu-button logged hidden add-post\">\r\n");
      out.write("            <a>Добавить пост</a>\r\n");
      out.write("        </div>\r\n");
      out.write("        <div class=\"menu-button logged hidden\">\r\n");
      out.write("            <a href=\"#\">Мой профиль</a>\r\n");
      out.write("        </div>\r\n");
      out.write("        <div class=\"menu-button logged hidden exit\">\r\n");
      out.write("            <a href=\"#\">Выйти</a>\r\n");
      out.write("        </div>\r\n");
      out.write("    </div>\r\n");
      out.write("    </header>\r\n");
      out.write("\r\n");
      out.write("    <main class=\"flex-main\">\r\n");
      out.write("        <div class=\"flex-free flex-left\"></div>\r\n");
      out.write("        <div class=\"flex-main-content\">\r\n");
      out.write("            <div class=\"wrap\">\r\n");
      out.write("                \r\n");
      out.write("            </div>\r\n");
      out.write("            \r\n");
      out.write("            <template class=\"template\">\r\n");
      out.write("            <div class=\"flex-post\">\r\n");
      out.write("                <div class=\"post-author\">\r\n");
      out.write("                    author\r\n");
      out.write("                    </div> \r\n");
      out.write("                <div class=\"post-button logged\">\r\n");
      out.write("                    <div class=\"cap\"></div>\r\n");
      out.write("                    <ul><form>\r\n");
      out.write("                            <li>\r\n");
      out.write("                                <button value=\"editPost\" type=\"button\">Редактировать</button>\r\n");
      out.write("                            </li>\r\n");
      out.write("                            <li>\r\n");
      out.write("                                <button value=\"deletePost\" type=\"button\">Удалить</button>\r\n");
      out.write("                            </li>\r\n");
      out.write("                        </form>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </div>\r\n");
      out.write("                <div class=\"post-date\">\r\n");
      out.write("                    date\r\n");
      out.write("                </div>\r\n");
      out.write("                \r\n");
      out.write("                <p class=\"post-text\"> text </p>\r\n");
      out.write("                <div class=\"post-bottom\">\r\n");
      out.write("                    <p class=\"hashtags\"></p>\r\n");
      out.write("                    <form class=\"like-button-form\">\r\n");
      out.write("                        <button class=\"like-button\" type=\"submit\" action=\"submit\">\r\n");
      out.write("                            <img src=\"https://i.ibb.co/3yk6gxT/like.png\">\r\n");
      out.write("                            <div class=\"likes-count\" ></div>\r\n");
      out.write("                        </button>\r\n");
      out.write("                    </form>\r\n");
      out.write("                </div>\r\n");
      out.write("            </template>\r\n");
      out.write("            \r\n");
      out.write("            <div class=\"main-button\">\r\n");
      out.write("                <button class=\"m-button\" type=\"button\" id=\"load-more-button\">\r\n");
      out.write("                    Загрузить ещё\r\n");
      out.write("                </button>\r\n");
      out.write("            </div>\r\n");
      out.write("         </div>\r\n");
      out.write("        <div class=\"flex-filter\">\r\n");
      out.write("            \r\n");
      out.write("            <div class=\"filter-choose\" >\r\n");
      out.write("                <ul>\r\n");
      out.write("                    <li>\r\n");
      out.write("                    <a href=\"#\">Добавить фильтр</a>\r\n");
      out.write("                        <ul>\r\n");
      out.write("                            <li id=\"date-filter\"><a href=\"#\">Дата</a></li>\r\n");
      out.write("                            <li id=\"hashtag-filter\"><a href=\"#\">Хэштег</a></li>\r\n");
      out.write("                            <li id=\"author-filter\"><a href=\"#\">Автор</a></li>\r\n");
      out.write("                        </ul>\r\n");
      out.write("                    </li>\r\n");
      out.write("                </ul>\r\n");
      out.write("            </div>\r\n");
      out.write("            <form id=\"filter-form\" method=\"post\" name=\"filter-form\">\r\n");
      out.write("            <button type=\"submit\" id=\"submit-filter-button\" form=\"filter-form\">Применить фильтры</button>\r\n");
      out.write("            </form>\r\n");
      out.write("        </div>\r\n");
      out.write("        <div class=\"flex-free flex-right\"> \r\n");
      out.write("        </div>\r\n");
      out.write("    </main>\r\n");
      out.write("    <footer>\r\n");
      out.write("            Даниил Сиваков, 2 курс, 7 группа worretes@gmail.com\r\n");
      out.write("    </footer>\r\n");
      out.write("    </body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
