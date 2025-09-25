@ECHO OFF
setlocal
set JAVA_EXE=java
set WRAPPER_JAR=.mvn\wrapper\maven-wrapper.jar
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
"%JAVA_EXE%" -classpath "%WRAPPER_JAR%" %WRAPPER_LAUNCHER% %*
