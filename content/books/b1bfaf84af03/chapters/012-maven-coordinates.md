## Apache Maven

<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>3.5.19</version>
</dependency>

## Apache Ivy

<dependency org="org.mybatis" name="mybatis" rev="3.5.19">
  <artifact name="mybatis" type="jar" />
</dependency>

## Groovy Grape

@Grapes(
@Grab(group='org.mybatis', module='mybatis', version='3.5.19')
)

## Gradle/Grails

implementation 'org.mybatis:mybatis:3.5.19'

## Scala SBT

libraryDependencies += "org.mybatis" % "mybatis" % "3.5.19"

## Leiningen

\[org.mybatis/mybatis "3.5.19"\]
