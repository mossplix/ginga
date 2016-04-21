#!/usr/bin/env python
import os
import re
import subprocess
import logging
import optparse
import struct
import sys
import psycopg2



def _generate_response(success=False):
    """
    Creates and sends a response back to the ejabberd server.

    :Parameters
       - `success`: boolean if we should respond successful or not
    """
    result = 0
    if success:
        result = 1
    sys.stdout.write(struct.pack('>hh', 2, result))
    sys.stdout.flush()

def _handle_isuser(username):
    """
    Handles the isuer ejabberd command.

    :Parameters:
       - `username`: the user name to verify exists
    """
    _generate_response(True)


def _handle_auth(username, password):
    """
    Handles authentication of the user.

    :Parameters:
       - `username`: the username to verify
       - `password`: the password to verify with the user
    """

    conn = psycopg2.connect("dbname=ginga_dev user=postgres host=127.0.0.1")
    print username
    cur = conn.cursor()
    cur.execute("SELECT * FROM guardian_tokens where jwt=%s",[password])
    response=cur.fetchone()

    if response:
        _generate_response(True)
    else:
        _generate_response(False)




def main():
    """
    How to check if a user is valid

    :Parameters:
       - `options`: keyword arguments
    """

    try:
        # Serve forever
        while True:
            # Verify the information checks out
            try:
                length = sys.stdin.read(2)
                size = struct.unpack('>h', length)[0]
                logging.debug('Got data of size ' + str(size))
                input = sys.stdin.read(size).split(':')
                operation = input.pop(0)
            except Exception, ex:
                # It wasn't even in the right format if we get here ...
                _generate_response(False)
                continue
            if operation == 'auth':
                _handle_auth(input[0], input[2])
            elif operation == 'isuser':
                _handle_isuser()
            elif operation == 'setpass':
                _generate_response(False)
    except KeyboardInterrupt:
        raise SystemExit(0)

if __name__ == "__main__":
    main()